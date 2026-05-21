package com.donotlisten.auth;

import com.donotlisten.common.ApiException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Transactional
    public AuthDTO.LoginResponse register(AuthDTO.RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ApiException("用户名已存在");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("邮箱已被使用");
        }

        var user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        return buildLoginResponse(user);
    }

    public AuthDTO.LoginResponse login(AuthDTO.LoginRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new ApiException("用户名或密码错误"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException("用户名或密码错误");
        }

        return buildLoginResponse(user);
    }

    private AuthDTO.LoginResponse buildLoginResponse(UserEntity user) {
        String token = jwtProvider.generateToken(user.getId(), user.getUsername());
        return AuthDTO.LoginResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .token(token)
                .level(user.getLevel())
                .totalListening(user.getTotalListening())
                .masteredCount(user.getMasteredCount())
                .build();
    }
}
