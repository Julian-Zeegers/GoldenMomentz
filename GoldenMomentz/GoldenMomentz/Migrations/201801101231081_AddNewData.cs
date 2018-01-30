namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewData : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[Customers] ( [Name], [IdNumber], [CellPhoneNumber], [WorkPhoneNumber], [Address], [Email]) VALUES (N'Julian Zeegers', 1234345456, N'0854562652', N'085659896',N'7 Elsa Street Cyrildene JHB',N'julianzeegers@rocketmail.com') ");
            Sql("INSERT INTO [dbo].[SalesPersons] ( [Name], [IdNumber], [CellPhoneNumber], [WorkPhoneNumber], [Email]) VALUES (N'Sean Zeegers', 6905856, N'0829726188', N'0116167536',N'sean@goldenmomentz.co.za') ");
            
        }
        
        public override void Down()
        {
        }
    }
}
