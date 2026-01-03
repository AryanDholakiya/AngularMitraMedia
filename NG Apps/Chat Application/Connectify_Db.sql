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

alter table Users
add constraint ct_UniqueMobile  UNIQUE(MobileNumber);

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

truncate table OtpVerifications
truncate table Users

create procedure sp_saveOtp
@Email NVARCHAR(255),
@Otp NVARCHAR(6),
@Expiry DATETIME
as
begin
SET NOCOUNT ON;
insert into OtpVerifications(Email,OtpCode,ExpiryTime) values
(@Email,@Otp,@Expiry);
end;


CREATE PROCEDURE sp_ValidateOtp
    @Email NVARCHAR(255),
    @OtpCode NVARCHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
        OtpId,
        ExpiryTime
    FROM OtpVerifications
    WHERE Email = @Email
      AND OtpCode = @OtpCode
      AND IsUsed = 0
    ORDER BY CreatedAt DESC;
END

CREATE PROCEDURE sp_RegisterUser
    @CountryCode NVARCHAR(10),
    @MobileNumber NVARCHAR(15),
    @Email NVARCHAR(255),
    @OtpId INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        INSERT INTO Users (CountryCode, MobileNumber, Email, IsEmailVerified)
        VALUES (@CountryCode, @MobileNumber, @Email, 1);

        UPDATE OtpVerifications
        SET IsUsed = 1
        WHERE OtpId = @OtpId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
