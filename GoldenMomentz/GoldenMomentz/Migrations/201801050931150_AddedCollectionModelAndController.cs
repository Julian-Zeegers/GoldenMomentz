namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCollectionModelAndController : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Collections",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderBookId = c.Int(nullable: false),
                        CollectionDate = c.DateTime(nullable: false),
                        OrderId = c.Int(nullable: false),
                        Amount = c.Int(nullable: false),
                        Paid = c.Boolean(nullable: false),
                        Notes = c.String(maxLength: 512),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .Index(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Collections", "OrderId", "dbo.Orders");
            DropIndex("dbo.Collections", new[] { "OrderId" });
            DropTable("dbo.Collections");
        }
    }
}
