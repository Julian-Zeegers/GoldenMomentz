namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedSurname : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "Name", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.SalesPersons", "Name", c => c.String(nullable: false, maxLength: 255));
            DropColumn("dbo.Customers", "FirstName");
            DropColumn("dbo.Customers", "Surname");
            DropColumn("dbo.SalesPersons", "FirstName");
            DropColumn("dbo.SalesPersons", "Surname");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SalesPersons", "Surname", c => c.String(maxLength: 255));
            AddColumn("dbo.SalesPersons", "FirstName", c => c.String(nullable: false, maxLength: 255));
            AddColumn("dbo.Customers", "Surname", c => c.String(maxLength: 255));
            AddColumn("dbo.Customers", "FirstName", c => c.String(nullable: false, maxLength: 255));
            DropColumn("dbo.SalesPersons", "Name");
            DropColumn("dbo.Customers", "Name");
        }
    }
}
