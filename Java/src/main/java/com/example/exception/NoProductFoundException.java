package com.example.exception;

public class NoProductFoundException extends Exception{
//    private static final long seriaLVersionUID = 1L;
    public NoProductFoundException(String message) {
        super(message);
    }
}
