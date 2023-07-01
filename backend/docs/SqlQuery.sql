CREATE TABLE Authentications (
    user_id varchar(50) primary key not null,
    password varchar(50)
);

CREATE TABLE Users (
    user_id varchar(50) primary key not null,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50),
    designation varchar(50),
    isPremium bit,
    created_at datetime,
    foreign key (user_id) references Authentications(user_id) on delete cascade
);

create Table Organisations(
	organisation_id varchar(50) primary key not null,
	organisation_name varchar(100),
	address varchar(500),
	about Text,
	terms_and_condition Text,
	created_by varchar(50),
	created_at datetime,
	foreign key (created_by) references Users (user_id) on delete cascade
)

create table Services(
	service_id varchar(50) primary key not null,
	service_name varchar(200),
	cost int,
	)