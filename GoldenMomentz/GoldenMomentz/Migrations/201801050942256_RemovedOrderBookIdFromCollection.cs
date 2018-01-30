namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedOrderBookIdFromCollection : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Collections", "OrderBookId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Collections", "OrderBookId", c => c.Int(nullable: false));
        }
    }
}
