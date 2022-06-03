const path = require('path'); // Used to find the current directory to find reports folder
const fs = require('fs'); // Used to open and read the files
const cheerio = require('cheerio') // Used to load and read html 
const postResults = require('./postResults') // Given the output of the html this will make the post call requested
const moment = require('moment') // Gets you the date time of the current day

const parseFiles = async () =>{
    let totalCount = 0
    let passCount = 0
    let failCount = 0
    const failDescriptions = []
    const directoryPath = path.join(__dirname, 'reports');
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
           return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (file) {
            try {
                const data = fs.readFileSync(`${directoryPath}/${file}`, 'utf8');
                const document = cheerio.load(data) // Load the raw data into an HTML document that Cheerio can parse and find specific html elements in

                document('[class="testcase success"]').each((_i,_elm)=>{
                    totalCount++
                    passCount++
                })

                document('[class="testcase error"]').each((_i,elm)=>{
                    failCount++
                    totalCount++
                    const failureNote = {} // Object used to construct failure description
                    const failureParent = cheerio.load(elm.parent.parent) // loads the parent parent div of the testcase error in order to find testcase name 
                    const testName =  failureParent('[class="name"]').html() // Finds name of suite error
                    const failureHtml = cheerio.load(elm) // loads the child html into cheerio
                    let failureMessage = failureHtml('[class="name"]').html()
                    failureNote[testName] = failureMessage
                    failDescriptions.push(failureNote)
                })
            } catch (err) {
                console.error(err);
            } 
        });

    const results =  {
        TOTAL_TESTS: totalCount, 
        PASSED_TESTS: passCount, 
        FAILED_TESTS:failCount, 
        ERROR_DETAILS: failDescriptions,
        DATETIME: moment().format('YYYY-MM-DDTHH:mm:ss')
    }
    await postResults(results)

    });

}
parseFiles()