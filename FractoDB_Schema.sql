-- ================================================
-- Fracto - Doctor Appointment Booking System
-- Database Schema - Sprint 1
-- ================================================

-- Create Database
CREATE DATABASE FractoDB;
USE FractoDB;

-- ================================================
-- Table 1: Specializations
-- Stores the types of doctors (Cardiologist etc)
-- ================================================
CREATE TABLE Specializations (
    SpecializationId    INT PRIMARY KEY IDENTITY(1,1),
    SpecializationName  NVARCHAR(100) NOT NULL
);

-- ================================================
-- Table 2: Users
-- Stores both normal users and admins
-- ================================================
CREATE TABLE Users (
    UserId          INT PRIMARY KEY IDENTITY(1,1),
    Username        NVARCHAR(100) NOT NULL,
    Email           NVARCHAR(150) NOT NULL,
    PasswordHash    NVARCHAR(256) NOT NULL,
    Role            NVARCHAR(20)  NOT NULL,  -- 'User' or 'Admin'
    ProfileImage    NVARCHAR(300)
);

-- ================================================
-- Table 3: Doctors
-- Stores doctor details
-- ================================================
CREATE TABLE Doctors (
    DoctorId            INT PRIMARY KEY IDENTITY(1,1),
    Name                NVARCHAR(100) NOT NULL,
    SpecializationId    INT NOT NULL,
    City                NVARCHAR(100),
    Rating              DECIMAL(3,2) DEFAULT 0,
    ProfileImage        NVARCHAR(300),
    FOREIGN KEY (SpecializationId) REFERENCES Specializations(SpecializationId)
);

-- ================================================
-- Table 4: Appointments
-- Stores all appointment bookings
-- ================================================
CREATE TABLE Appointments (
    AppointmentId       INT PRIMARY KEY IDENTITY(1,1),
    UserId              INT NOT NULL,
    DoctorId            INT NOT NULL,
    AppointmentDate     DATE NOT NULL,
    TimeSlot            NVARCHAR(20) NOT NULL,  -- e.g. '10:00 AM'
    Status              NVARCHAR(20) DEFAULT 'Pending', -- Pending, Confirmed, Cancelled
    FOREIGN KEY (UserId)    REFERENCES Users(UserId),
    FOREIGN KEY (DoctorId)  REFERENCES Doctors(DoctorId)
);

-- ================================================
-- Table 5: Ratings
-- Stores user ratings for doctors
-- ================================================
CREATE TABLE Ratings (
    RatingId    INT PRIMARY KEY IDENTITY(1,1),
    DoctorId    INT NOT NULL,
    UserId      INT NOT NULL,
    Rating      INT CHECK (Rating BETWEEN 1 AND 5),
    FOREIGN KEY (DoctorId)  REFERENCES Doctors(DoctorId),
    FOREIGN KEY (UserId)    REFERENCES Users(UserId)
);

-- ================================================
-- Sample Data (optional - just to test)
-- ================================================

INSERT INTO Specializations (SpecializationName) VALUES
('Cardiologist'),
('Dentist'),
('Dermatologist'),
('Neurologist'),
('General Physician');

INSERT INTO Users (Username, Email, PasswordHash, Role) VALUES
('admin',       'admin@fracto.com', 'hashedpassword123', 'Admin'),
('john_doe',    'john@gmail.com',   'hashedpassword456', 'User');

INSERT INTO Doctors (Name, SpecializationId, City, Rating) VALUES
('Dr. Sharma',  1, 'Mumbai',  4.5),
('Dr. Mehta',   2, 'Delhi',   4.0),
('Dr. Kapoor',  3, 'Mumbai',  3.8);
