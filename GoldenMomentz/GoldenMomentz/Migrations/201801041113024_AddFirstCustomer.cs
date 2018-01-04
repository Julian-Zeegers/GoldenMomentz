namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFirstCustomer : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO [dbo].[Customers] ( [FirstName], [Surname], [IdNumber], [CellPhoneNumber], [WorkPhoneNumber], [Address]) VALUES (N'Julian', N'Zeegers', 1234345456, N'0854562652', N'085659896',N'7 Elsa Street Cyrildene JHB') ");
        }
        
        public override void Down()
        {
        }
    }
}
