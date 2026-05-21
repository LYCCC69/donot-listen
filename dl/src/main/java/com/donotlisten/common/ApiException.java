package com.donotlisten.common;

public class ApiException extends RuntimeException {

    private final int code;

    public ApiException(int code, String message) {
        super(message);
        this.code = code;
    }

    public ApiException(String message) {
        this(-1, message);
    }

    public int getCode() { return code; }
}
