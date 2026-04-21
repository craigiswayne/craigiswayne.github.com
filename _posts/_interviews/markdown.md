## Describe a specific, non-obvious bug you fixed that involved both frontend and backend code. What was the root cause, how did you find it, and how long did it take to fix? (Include a rough date, e.g., 'Q2 2023'.)

We experience a payment issue with one of our card verification systems that would return a failure to the frontend but we couldn't quite figure out what was going on due to the cross site redirection. Took us approximately 4 hours to debug. We were'nt sure if the issue was with the payment gateway or frontend. We added a bunch of logs, tried to replicate on the production server, but couldn't, eventually we found the issue that there was an extra header in the HTTP request that was being picked up the Payment Gateway, it seemed dodgy so they flagged the payment as a "potential risk" and rejected it.

We removed the adidtional header that was actually coming from the middleware, and that resolved the issue
