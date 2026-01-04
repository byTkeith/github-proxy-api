package com.atipera;


import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


/**
* Maps exceptions to HTTP responses.
*/
@RestControllerAdvice
public class GithubExceptionHandler {


@ExceptionHandler(GithubUserNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(GithubUserNotFoundException ex) {
return ResponseEntity.status(HttpStatus.NOT_FOUND)
.body(new ErrorResponse(404, ex.getMessage()));
}
}