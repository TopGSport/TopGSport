using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TopGSport.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Szorty treningowe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Szorty SStreningowe");
        }
    }
}
