namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDateTime2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Collections", "CollectionDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Orders", "DateCreated", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "DateCreated", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Collections", "CollectionDate", c => c.DateTime(nullable: false));
        }
    }
}
