package com.ibm.service;

import com.ibm.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

}