namespace GoldenMomentz.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedOrderAndCollectionData : DbMigration
    {
        public override void Up()
        {
            Sql(@"INSERT INTO [dbo].[Orders] ( [OrderBookId], [DateCreated], [CustomerId], [SalesPersonId], [PurchasePrice], [Deposit], [PenaltyCharge], [Notes]) 
                  VALUES (1234, 05-01-2018, 1, 2, 699, 0, 0, null)
                  INSERT INTO [dbo].[Collections] ( [CollectionDate], [OrderId], [Amount], [Paid], [Notes]) 
                  VALUES (30-01-2018, 1,300, 0, null)");
        }
        
        public override void Down()
        {
        }
    }
}
