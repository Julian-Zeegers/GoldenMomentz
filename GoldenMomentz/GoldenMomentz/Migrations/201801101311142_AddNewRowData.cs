namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewRowData : DbMigration
    {
        public override void Up()
        {
            Sql(@"INSERT INTO [dbo].[Orders] ( [OrderBookId], [DateCreated], [CustomerId], [SalesPersonId], [PurchasePrice], [Deposit], [PenaltyCharge], [Notes]) 
                  VALUES (1234, 2018-01-27, 1,1, 699, 0, 0, N'An example Note')
                 ");
        }
        
        public override void Down()
        {
        }
    }
}
