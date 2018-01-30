namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSalesPersonModelAndController : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SalesPersons",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 255),
                        Surname = c.String(maxLength: 255),
                        IdNumber = c.Int(),
                        CellPhoneNumber = c.String(maxLength: 10),
                        WorkPhoneNumber = c.String(maxLength: 10),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Customers", "Email", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "Email");
            DropTable("dbo.SalesPersons");
        }
    }
}
