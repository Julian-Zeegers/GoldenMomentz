namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedOrderModelAndController : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderBookId = c.Int(nullable: false),
                        DateCreated = c.DateTime(nullable: false),
                        CustomerId = c.Int(nullable: false),
                        SalesPersonId = c.Int(nullable: false),
                        PurchasePrice = c.Int(nullable: false),
                        Deposit = c.Int(nullable: false),
                        PenaltyCharge = c.Int(nullable: false),
                        Notes = c.String(maxLength: 512),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customers", t => t.CustomerId, cascadeDelete: true)
                .ForeignKey("dbo.SalesPersons", t => t.SalesPersonId, cascadeDelete: true)
                .Index(t => t.CustomerId)
                .Index(t => t.SalesPersonId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "SalesPersonId", "dbo.SalesPersons");
            DropForeignKey("dbo.Orders", "CustomerId", "dbo.Customers");
            DropIndex("dbo.Orders", new[] { "SalesPersonId" });
            DropIndex("dbo.Orders", new[] { "CustomerId" });
            DropTable("dbo.Orders");
        }
    }
}
