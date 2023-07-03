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
	email varchar(50),
	mobile varchar(50),
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

create table Clients(
	client_id varchar(50) primary key not null,
	client_name varchar(100),
	client_email varchar(50) unique not null,
	client_mobile varchar(50),
	client_state varchar(50)
)

create table Quotations(
	quotation_id varchar(50) primary key not null,
	created_at datetime,
	created_by varchar(50),
	total_cost int,
	client_id varchar(50),
	foreign key(client_id) references Clients(client_id) on delete cascade,
	foreign key(created_by) references Users(user_id) on delete set null
)

create table QuotationServiceMappings(
	quotation_id varchar(50),
	service_id varchar(50),
	foreign key (quotation_id) references Quotations(quotation_id) on delete cascade,
	foreign key (service_id) references Services(service_id) on delete set null,
)

create table UserOrganisationMappings(
	user_id varchar(50),
	organisation_id varchar(50),
	foreign key (user_id) references Users(user_id),
	foreign key (organisation_id) references Organisations(organisation_id),
	)

