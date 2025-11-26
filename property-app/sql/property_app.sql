CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    userType ENUM('admin','user') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties Table
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    destination VARCHAR(255),
    image VARCHAR(512),
    lat DECIMAL(10,7),
    lng DECIMAL(10,7),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Floors Table (linked to properties)
CREATE TABLE floors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    floorType VARCHAR(50),
    floorUse VARCHAR(255),
    floorArea DECIMAL(10,2),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
