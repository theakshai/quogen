using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TempUsers",
                table: "TempUsers");

            migrationBuilder.RenameTable(
                name: "TempUsers",
                newName: "TempTables");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TempTables",
                table: "TempTables",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TempTables",
                table: "TempTables");

            migrationBuilder.RenameTable(
                name: "TempTables",
                newName: "TempUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TempUsers",
                table: "TempUsers",
                column: "id");
        }
    }
}
