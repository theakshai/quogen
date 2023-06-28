create Table Authentications(
	user_id varchar(50) primary key not null,
	password varchar(50)
	)

create Table Users(
	user_id varchar(50),
	first_name varchar(50),
	last_name varchar(50),
	email varchar(50),
	designation varchar(50),
	isPremium bit,
	created_at datetime
	foreign key(user_id) references Authentications(user_id) on delete cascade,
	)