package com.ibm.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader =
                request.getHeader("Authorization");

        String jwt = null;
        String email = null;

        /*
         * Check whether the request contains:
         *
         * Authorization: Bearer <JWT>
         */
        if (authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ")) {

            jwt = authorizationHeader.substring(7);

            try {
                email = jwtService.extractUsername(jwt);
            } catch (Exception e) {
                /*
                 * Invalid or expired JWT.
                 *
                 * We do not authenticate the request.
                 * The request continues through the filter chain.
                 */
                filterChain.doFilter(request, response);
                return;
            }
        }

        /*
         * Only authenticate the request if:
         *
         * 1. JWT contains a username/email
         * 2. No authentication has already been established
         */
        if (email != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            if (jwtService.isTokenValid(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}