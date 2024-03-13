-- User Table
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    UserRole VARCHAR(20) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Institution Table
CREATE TABLE Institution (
    InstitutionID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    ContactPerson VARCHAR(50),
    ContactEmail VARCHAR(100),
    ContactPhone VARCHAR(20)
);

-- Trainer Table
CREATE TABLE Trainer (
    TrainerID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Bio TEXT,
    Qualifications TEXT,
    AreasOfExpertise TEXT,
    AvailabilityStatus VARCHAR(20) DEFAULT 'Available'
);

-- TrainingProgram Table
CREATE TABLE TrainingProgram (
    ProgramID INT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    Location VARCHAR(100),
    Status VARCHAR(20) DEFAULT 'Pending',
    InstitutionID INT,
    TrainerID INT,
    FOREIGN KEY (InstitutionID) REFERENCES Institution(InstitutionID),
    FOREIGN KEY (TrainerID) REFERENCES Trainer(TrainerID)
);

-- TrainerTrainingProgram Table
CREATE TABLE TrainerTrainingProgram (
    TrainerTrainingProgramID INT PRIMARY KEY,
    TrainerID INT,
    ProgramID INT,
    AttendanceStatus VARCHAR(20) DEFAULT 'Attended', -- or 'Not Attended'
    FOREIGN KEY (TrainerID) REFERENCES Trainer(TrainerID),
    FOREIGN KEY (ProgramID) REFERENCES TrainingProgram(ProgramID)
);

-- Feedback Table
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY,
    TrainerID INT,
    ProgramID INT,
    Rating INT,
    Comments TEXT,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TrainerID) REFERENCES Trainer(TrainerID),
    FOREIGN KEY (ProgramID) REFERENCES TrainingProgram(ProgramID)
);
