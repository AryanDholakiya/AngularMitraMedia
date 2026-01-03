create database Students
go
use Students

create table Student(
	GrNumber int identity(1,1) primary key,
	SName varchar(100),
	SGender varchar(100),
	SAge int,
	SStd int
)

alter table Student
alter column sPhoto nvarchar(max) null;


insert into Student values ('Arzu','Male',15,10), ('jay','Male',16,11), ('Sonu','Male',16,11)

select * from Student

create table Teachers(
	TeacherId INT PRIMARY KEY IDENTITY(1,1),
	UserName varchar(50) not Null,
	Password varchar(255) not null,
)
insert into Teachers values('vinod','vinod123@'),('jitendra','jitendra123@');

select * from Teachers;