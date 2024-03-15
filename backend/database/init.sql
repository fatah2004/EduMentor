-- User Table
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserRole VARCHAR(20) NOT NULL, -- Role can be 'admin', 'trainer', or 'institution'
    Email VARCHAR(100) UNIQUE NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Bio TEXT,
    Qualifications TEXT, -- For trainers
    AreasOfExpertise TEXT, -- For trainers
    AvailabilityStatus VARCHAR(20) DEFAULT 'Available', -- For trainers
    InstitutionName VARCHAR(100), -- For institutions
    InstitutionDescription TEXT, -- For institutions
    ContactPerson VARCHAR(50), -- For institutions
    ContactEmail VARCHAR(100), -- For institutions
    ContactPhone VARCHAR(20) -- For institutions
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
