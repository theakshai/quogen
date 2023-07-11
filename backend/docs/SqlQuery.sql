CREATE TABLE Authentications (
    user_id varchar(50) primary key not null,
    password varchar(500)
);

CREATE TABLE Users (
    user_id varchar(50) primary key not null,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50),
    designation varchar(50),
    created_at datetime,
    foreign key (user_id) references Authentications(user_id) on delete cascade
);

create Table Organisations(
	organisation_id varchar(50) primary key not null,
	organisation_name varchar(100),
	email varchar(50),
	mobile varchar(50),
	about varchar(50),
	created_by varchar(50),
	created_at datetime,
	foreign key (created_by) references Users (user_id) on delete cascade
)


create table Clients(
	client_id varchar(50)  primary key not null,
	client_name varchar(100),
	client_email varchar(50) unique not null,
	client_mobile varchar(50),
	client_state varchar(50)
)

create table Senders(
	sender_id varchar(50)  primary key not null,
	sender_name varchar(100),
	sender_email varchar(50)  not null,
	sender_mobile varchar(50),
	sender_state varchar(50)
	)

create table Quotations(
	quotation_id varchar(50)  primary key not null,
	confirmed bit,
	created_at datetime,
	created_by varchar(50),
	total_cost int,
	service nvarchar(max),
	client_id varchar(50),
	sender_id varchar(50),
	foreign key(client_id) references Clients(client_id) on delete cascade,
	foreign key(sender_id) references Senders(sender_id) on delete cascade,
	foreign key(created_by) references Users(user_id) on delete set null
)

create table UserOrganisationMappings(
	id int primary key identity,
	user_id varchar(50),
	organisation_id varchar(50),
	foreign key (user_id) references Users(user_id) ,
	foreign key (organisation_id) references Organisations(organisation_id) ,
	)

create table OrgQuotationMappings(
	 id int primary key identity,
	organisation_id varchar(50),
	quotation_id varchar(50),
	foreign key (organisation_id) references Organisations(organisation_id) on delete cascade,
	foreign key (quotation_id) references Quotations(quotation_id) on delete set null ,

)

delete from UserOrganisationMappings
delete from Users
delete from Authentications
delete from Organisations
delete from Quotations
delete from Senders
delete from Clients

drop table UserOrganisationMappings
drop table OrgQuotationMappings
drop table Users
drop table Organisations
drop table Clients
drop table Senders
drop table Authentications
drop table Quotations

select * from Quotations