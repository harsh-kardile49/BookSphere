package com.ibm.service;

import com.ibm.dto.JwtResponse;
import com.ibm.dto.LoginRequest;
import com.ibm.dto.RegisterRequest;
import com.ibm.entity.Role;
import com.ibm.entity.User;
import com.ibm.exception.EmailAlreadyExistsException;
import com.ibm.repository.RoleRepository;
import com.ibm.repository.UserRepository;
import com.ibm.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered.");
        }

        Role studentRole = roleRepository
                .findByRoleName("Student")
                .orElseThrow(() ->
                        new RuntimeException("Default Student role not found in database."));

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setPhone(request.getPhone());

        user.setRole(studentRole);

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public JwtResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        String token = jwtService.generateToken(
                (org.springframework.security.core.userdetails.UserDetails)
                        authentication.getPrincipal()
        );

        return new JwtResponse(token);
    }
}