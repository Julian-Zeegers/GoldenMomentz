namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFirstSalesPerson : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[SalesPersons] ( [FirstName], [Surname], [IdNumber], [CellPhoneNumber], [WorkPhoneNumber], [Email]) VALUES (N'Sean', N'Zeegers', 6905856, N'0829726188', N'0116167536',N'sean@goldenmomentz.co.za') ");
        }
        
        public override void Down()
        {
        }
    }
}
