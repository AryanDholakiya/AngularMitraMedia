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

--profile page mate
ALTER TABLE Users
ADD
    Username NVARCHAR(100) NULL,
    About NVARCHAR(300) NULL,
    ProfileImage NVARCHAR(255) NULL;

ALTER TABLE Users
ADD ProfileImage VARBINARY(MAX) NULL;

ALTER TABLE Users
ADD IsProfileCompleted  bit default 0;

select * from Users

CREATE TABLE OtpVerifications (
    OtpId INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL,
    OtpCode NVARCHAR(6) NOT NULL,
    ExpiryTime DATETIME NOT NULL,
    IsUsed BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

ALTER TABLE OtpVerifications
drop constraint UQ__OtpVerif__250375B130ABC979

ALTER TABLE OtpVerifications
alter column MobileNumber NVARCHAR(20) NOT NULL;

ALTER TABLE OtpVerifications
drop column Purpose ;

select * from OtpVerifications
select * from Users

truncate table OtpVerifications
truncate table Users

--send otp to user's email
alter procedure sp_saveOtp
@Email NVARCHAR(255),
@MobileNumber NVARCHAR(15),
@Otp NVARCHAR(6),
@Expiry DATETIME
as
begin
SET NOCOUNT ON;

--remove data wich is old -- keep records which are today's
delete from OtpVerifications 
where ExpiryTime < GETDATE()

insert into OtpVerifications(Email,OtpCode,ExpiryTime,MobileNumber) values
(@Email,@Otp,@Expiry,@MobileNumber);
end;

--validate the otp entered by user
--alter PROCEDURE sp_ValidateOtp  
--    @Email NVARCHAR(255) = null, --backend mathi email na moklie to by default "null" pass kravi aagal chalva do
--	@MobileNumber nvarchar(15) = null,
--    @OtpCode NVARCHAR(6)
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT TOP 1
--        o.OtpId,
--        o.ExpiryTime,
--		u.UserId
--    FROM OtpVerifications o
--	left join Users u on (o.MobileNumber = u.MobileNumber or o.Email = u.Email)
--    WHERE (
--            (@MobileNumber IS NOT NULL AND MobileNumber = @MobileNumber)
--            OR (@MobileNumber IS NULL AND Email = @Email)
--        )
--      AND o.OtpCode = @OtpCode
--      AND o.IsUsed = 0
--    ORDER BY o.CreatedAt DESC;
--END


ALTER PROCEDURE sp_ValidateOtp  
    @Email NVARCHAR(255) = null, 
    @MobileNumber nvarchar(15) = null,
    @OtpCode NVARCHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
        O.OtpId,
        O.ExpiryTime,
        U.UserId,  
		U.Email
    FROM OtpVerifications O

    LEFT JOIN Users U ON 
        (O.MobileNumber = U.MobileNumber OR O.Email = U.Email)
    WHERE (
            (@MobileNumber IS NOT NULL AND O.MobileNumber = @MobileNumber)
            OR (@MobileNumber IS NULL AND O.Email = @Email)
        )
      AND O.OtpCode = @OtpCode
      AND O.IsUsed = 0
    ORDER BY O.CreatedAt DESC;
END


--rergister user and add into Users table
ALTER PROCEDURE sp_RegisterUser
    @CountryCode NVARCHAR(10),
    @MobileNumber NVARCHAR(15),
    @Email NVARCHAR(255),
    @OtpId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewUserId INT;

    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Users (CountryCode, MobileNumber, Email, IsEmailVerified)
        VALUES (@CountryCode, @MobileNumber, @Email, 1);

        SET @NewUserId = SCOPE_IDENTITY();

        UPDATE OtpVerifications
        SET IsUsed = 1
        WHERE OtpId = @OtpId;

        COMMIT TRANSACTION;

        SELECT @NewUserId AS UserId;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END



--user exist or not
alter procedure sp_UserExist
	@MobileNumber nvarchar(15)
as 
begin 
	  SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Users WHERE MobileNumber = @MobileNumber)
        SELECT 1;  -- user exists
    ELSE
        SELECT 0;  -- user does not exist

end


--login otp
create procedure sp_LoginSendOtp 
	@MobileNumber nvarchar(15)
as
begin
	SELECT Email FROM Users		
	WHERE MobileNumber = @MobileNumber
end



--after login successfully make Otp isUsed = 1
create procedure sp_OtpUsed
	@OtpCode NVARCHAR(6)
as
begin
	update OtpVerifications 
	set IsUsed = 1
	where 
	OtpCode = @OtpCode
end

--for profile page
ALTER PROCEDURE sp_UpdateUserProfile
    @UserId INT,
    @Username NVARCHAR(100),
    @About NVARCHAR(300) = null,
    @ProfileImage VARBINARY(MAX) = null
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        Username = @Username,
        About = @About,
        ProfileImage = @ProfileImage,
		IsProfileCompleted = 1
    WHERE UserId = @UserId;
END

--for profile page
alter PROCEDURE sp_GetUserProfile
    @UserId INT
AS
BEGIN
    SELECT
        Username,
        About,
        ProfileImage,
		IsProfileCompleted,
		Email,
		CountryCode,
		MobileNumber
    FROM Users
    WHERE UserId = @UserId;
END

select * from OtpVerifications
select * from Users	

truncate table OtpVerifications
truncate table Users
	