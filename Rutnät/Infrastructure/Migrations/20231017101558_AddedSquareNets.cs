using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddedSquareNets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SquareNets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApplicationUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SquareNets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Squares",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Color = table.Column<int>(type: "int", nullable: false),
                    SquareNetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Squares", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Squares_SquareNets_SquareNetId",
                        column: x => x.SquareNetId,
                        principalTable: "SquareNets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Squares_SquareNetId",
                table: "Squares",
                column: "SquareNetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Squares");

            migrationBuilder.DropTable(
                name: "SquareNets");
        }
    }
}
