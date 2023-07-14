﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230713085050_init3")]
    partial class init3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Authentication", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("user_id");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("password");

                    b.HasKey("UserId");

                    b.ToTable("Authentications");
                });

            modelBuilder.Entity("backend.Models.Client", b =>
                {
                    b.Property<string>("Client_id")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("client_id");

                    b.Property<string>("ClientEmail")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_email");

                    b.Property<string>("ClientMobile")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_mobile");

                    b.Property<string>("ClientName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_name");

                    b.Property<string>("ClientState")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_state");

                    b.HasKey("Client_id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("backend.Models.Organisation", b =>
                {
                    b.Property<string>("OrganistationId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("organisation_id");

                    b.Property<string>("About")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("about");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_at");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("created_by");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("email");

                    b.Property<string>("Mobile")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("mobile");

                    b.Property<string>("OrganisationName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("organisation_name");

                    b.HasKey("OrganistationId");

                    b.ToTable("Organisations");
                });

            modelBuilder.Entity("backend.Models.Quotation", b =>
                {
                    b.Property<string>("QuotationId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("quotation_id");

                    b.Property<string>("About")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("about");

                    b.Property<string>("ClientId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_id");

                    b.Property<string>("ClientName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("client_name");

                    b.Property<bool?>("Confirmed")
                        .HasColumnType("bit")
                        .HasColumnName("confirmed");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_at");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("created_by");

                    b.Property<string>("SenderId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("sender_id");

                    b.Property<string>("Service")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("service");

                    b.Property<string>("Tc")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("tc");

                    b.HasKey("QuotationId");

                    b.ToTable("Quotations");
                });

            modelBuilder.Entity("backend.Models.Sender", b =>
                {
                    b.Property<string>("SenderId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("sender_id");

                    b.Property<string>("SenderEmail")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("sender_email");

                    b.Property<string>("SenderMobile")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("sender_mobile");

                    b.Property<string>("SenderName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("sender_name");

                    b.Property<string>("SenderState")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("sender_state");

                    b.HasKey("SenderId");

                    b.ToTable("Senders");
                });

            modelBuilder.Entity("backend.Models.TempTable", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("email");

                    b.Property<string>("OrgId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("org_id");

                    b.HasKey("Id");

                    b.ToTable("TempTables");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("user_id");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_at");

                    b.Property<string>("Designation")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("designation");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("last_name");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.UserOrganisationMappings", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("OrganisationId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("organisation_id");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.ToTable("UserOrganisationMappings");
                });
#pragma warning restore 612, 618
        }
    }
}
