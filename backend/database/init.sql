-- User Table
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserRole VARCHAR(20) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    TrainerInstitution VARCHAR(50),
    Bio TEXT,
    Qualifications TEXT,
    AreasOfExpertise TEXT,
    AvailabilityStatus VARCHAR(20) DEFAULT 'Available',
    InstitutionName VARCHAR(100),
    InstitutionDescription TEXT,
    ContactPerson VARCHAR(50),
    ContactEmail VARCHAR(100),
    ContactPhone VARCHAR(20)
);

-- TrainingProgram Table
CREATE TABLE TrainingProgram (
    ProgramID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    Location VARCHAR(100),
    Status VARCHAR(20) DEFAULT 'Pending',
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- TrainerTrainingProgram Table
CREATE TABLE TrainerTrainingProgram (
    TrainerTrainingProgramID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ProgramID INT,
    AttendanceStatus VARCHAR(20) DEFAULT 'Attended',
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ProgramID) REFERENCES TrainingProgram(ProgramID)
);

-- Feedback Table
CREATE TABLE Feedback (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ProgramID INT,
    Rating INT,
    Comments TEXT,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ProgramID) REFERENCES TrainingProgram(ProgramID)
);
