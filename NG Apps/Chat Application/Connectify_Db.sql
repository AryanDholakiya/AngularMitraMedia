create database Connectify
use Connectify

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    CountryCode NVARCHAR(10) NOT NULL,
    MobileNumber NVARCHAR(15) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    IsEmailVerified BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
go
CREATE TABLE OtpVerifications (
    OtpId INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL,
    OtpCode NVARCHAR(6) NOT NULL,
    ExpiryTime DATETIME NOT NULL,
    IsUsed BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

select * from OtpVerifications
