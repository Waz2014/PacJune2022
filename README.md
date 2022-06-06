# PacJune2022
Exercise 

1. You run this in a VS Code Editor. 
2. Type npm install --gobal yarn
3. Type yarn command hit enter
4. Type yarn test hit enter.
5. Read the result in the console.
6. Console will read the following as result. 
Results Data:  {
  TOTAL_TESTS: 47,
  PASSED_TESTS: 46,
  FAILED_TESTS: 1,
  ERROR_DETAILS: [
    {
      Payment: 'Timed out while waiting for element &lt;button[id=btn-place-order]&gt; to be present for 30000 milliseconds. - expected "visible" but got: "not found" (30095ms) Expected "visible" but got: "not found"'
    }
  ],
  DATETIME: '2022-06-06T12:05:49'
}

    Challenge: 
    Create a summary in the following structure:
    Total number of tests
    Total Pass
    Total Failed
    Failed Client(s)
    Error
    Post summary to “/results”
    HEADERS:
    "Content-Type", "application/json"
    REQ BODY:
    DATETIME (datetime)
    TOTAL_TESTS (int)
    PASSED_TESTS (int)
    FAILED_TESTS (int)
    ERROR_DETAILS (string
    
    
