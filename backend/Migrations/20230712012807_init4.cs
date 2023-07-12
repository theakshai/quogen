using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class init4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "total_cost",
                table: "Quotations");

            migrationBuilder.AddColumn<string>(
                name: "about",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "client_name",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tc",
                table: "Quotations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "about",
                table: "Quotations");

            migrationBuilder.DropColumn(
                name: "client_name",
                table: "Quotations");

            migrationBuilder.DropColumn(
                name: "tc",
                table: "Quotations");

            migrationBuilder.AddColumn<int>(
                name: "total_cost",
                table: "Quotations",
                type: "int",
                nullable: true);
        }
    }
}
