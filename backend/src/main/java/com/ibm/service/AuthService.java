package com.ibm.service;

import com.ibm.dto.JwtResponse;
import com.ibm.dto.LoginRequest;
import com.ibm.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    JwtResponse login(LoginRequest request);
}