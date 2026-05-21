CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    level INT NOT NULL DEFAULT 4,
    total_listening INT NOT NULL DEFAULT 0,
    mastered_count INT NOT NULL DEFAULT 0,
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE revoked_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    jti VARCHAR(255) NOT NULL,
    revoked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listening_materials (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    level INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    duration INT NOT NULL,
    audio_url VARCHAR(500) NOT NULL,
    set_number INT NOT NULL
);

CREATE TABLE transcript_lines (
    id VARCHAR(50) PRIMARY KEY,
    listening_id VARCHAR(50) NOT NULL,
    number INT NOT NULL,
    speaker VARCHAR(10),
    text TEXT NOT NULL,
    start_time DOUBLE NOT NULL,
    end_time DOUBLE NOT NULL,
    FOREIGN KEY (listening_id) REFERENCES listening_materials(id)
);

CREATE TABLE user_listening_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    listening_id VARCHAR(50) NOT NULL,
    progress DOUBLE NOT NULL DEFAULT 0,
    last_position DOUBLE NOT NULL DEFAULT 0,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listening_id) REFERENCES listening_materials(id)
);

CREATE TABLE listening_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    listening_id VARCHAR(50) NOT NULL,
    line_number INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE learning_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    listening_id VARCHAR(50) NOT NULL,
    duration INT NOT NULL DEFAULT 0,
    feedback_count INT NOT NULL DEFAULT 0,
    practiced_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE listening_review_queue (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    listening_id VARCHAR(50) NOT NULL,
    line_number INT,
    stability DOUBLE DEFAULT 0,
    difficulty_fsrs DOUBLE DEFAULT 0,
    last_review_rating INT DEFAULT NULL,
    elapsed_days INT DEFAULT 0,
    scheduled_days INT DEFAULT 0,
    scheduler_version VARCHAR(20) DEFAULT 'fsrs',
    interval_days INT DEFAULT 0,
    due_date DATETIME,
    mastery_state VARCHAR(20) DEFAULT 'NEW',
    mastery_score DOUBLE DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_collection (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    listening_id VARCHAR(50) NOT NULL,
    collected_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listening_id) REFERENCES listening_materials(id),
    UNIQUE KEY uk_user_listening (user_id, listening_id)
);

CREATE TABLE user_line_collection (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    line_id VARCHAR(50) NOT NULL,
    collected_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE ai_sentence_analysis (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    line_id VARCHAR(50) NOT NULL,
    translation TEXT,
    analysis TEXT,
    weakness_tags VARCHAR(500),
    difficulty VARCHAR(20),
    sense_groups TEXT,
    model_version VARCHAR(50),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_line_model (line_id, model_version)
);

CREATE TABLE user_sentence_weakness (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    line_id VARCHAR(50) NOT NULL,
    weakness_tag VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE daily_learning_stats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    date DATE NOT NULL,
    learned_count INT NOT NULL DEFAULT 0,
    understood_count INT NOT NULL DEFAULT 0,
    familiar_count INT NOT NULL DEFAULT 0,
    unfamiliar_count INT NOT NULL DEFAULT 0,
    listening_duration INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY uk_user_date (user_id, date)
);
