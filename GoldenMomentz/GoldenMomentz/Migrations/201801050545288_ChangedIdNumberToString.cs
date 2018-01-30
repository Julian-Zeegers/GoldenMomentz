namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedIdNumberToString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "IdNumber", c => c.String());
            AlterColumn("dbo.SalesPersons", "IdNumber", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SalesPersons", "IdNumber", c => c.Int());
            AlterColumn("dbo.Customers", "IdNumber", c => c.Int());
        }
    }
}
