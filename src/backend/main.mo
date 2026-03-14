import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Bike = {
    id : Text;
    legalNo : Text;
    ownershipPercentage : Nat;
    todayEarnings : Nat;
    monthEarnings : Nat;
    status : Text;
    investedAmount : Nat;
  };

  public type Payout = {
    date : Text;
    bikeId : Text;
    grossRevenue : Int;
    investorShare : Int;
    status : Text;
  };

  public type FamilyMember = {
    name : Text;
    share : Int;
    amount : Int;
    role : Text;
  };

  public type InvestorProfile = {
    investorName : Text;
    city : Text;
    bikes : [Bike];
    payouts : [Payout];
    familyMembers : [FamilyMember];
    portfolioValue : Nat;
    totalBikes : Nat;
    totalPayout : Nat;
  };

  // UserProfile type required by the access control system
  public type UserProfile = {
    name : Text;
  };

  let investors = Map.empty<Principal, InvestorProfile>();
  let demoInvestors = Map.empty<Text, InvestorProfile>();
  let initializedDemos = Map.empty<Principal, Bool>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Required access control functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Application-specific functions
  public query ({ caller }) func getMyProfile() : async ?InvestorProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    investors.get(caller);
  };

  public shared ({ caller }) func upsertMyProfile(profile : InvestorProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    investors.add(caller, profile);
  };

  public shared ({ caller }) func seedDemoData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can seed demo data");
    };

    // Check if demo data has already been initialized for this principal
    if (initializedDemos.containsKey(caller)) {
      Runtime.trap("Demo data already initialized for this principal. This method should only run once.");
    };

    let demo1 : InvestorProfile = {
      investorName = "John Doe";
      city = "Los Angeles";
      bikes = [{ id = "bike001"; legalNo = "LN123"; ownershipPercentage = 80; todayEarnings = 30; monthEarnings = 350; status = "Active"; investedAmount = 35000 }];
      payouts = [{ date = "2023-05-01"; bikeId = "bike001"; grossRevenue = 35000; investorShare = 28000; status = "Success" }];
      familyMembers = [{ name = "Jane Doe"; share = 20; amount = 12000; role = "Wife" }];
      portfolioValue = 35000;
      totalBikes = 1;
      totalPayout = 28000;
    };

    let demo2 : InvestorProfile = {
      investorName = "Jane Smith";
      city = "New York";
      bikes = [{ id = "bike002"; legalNo = "LN124"; ownershipPercentage = 100; todayEarnings = 40; monthEarnings = 400; status = "Active"; investedAmount = 40000 }];
      payouts = [{ date = "2023-06-01"; bikeId = "bike002"; grossRevenue = 40000; investorShare = 40000; status = "Success" }];
      familyMembers = [{ name = "John Smith"; share = 50; amount = 20000; role = "Husband" }];
      portfolioValue = 40000;
      totalBikes = 1;
      totalPayout = 40000;
    };

    let demo3 : InvestorProfile = {
      investorName = "Alice Johnson";
      city = "Chicago";
      bikes = [{ id = "bike003"; legalNo = "LN125"; ownershipPercentage = 60; todayEarnings = 25; monthEarnings = 300; status = "Active"; investedAmount = 30000 }];
      payouts = [{ date = "2023-07-01"; bikeId = "bike003"; grossRevenue = 30000; investorShare = 18000; status = "Success" }];
      familyMembers = [{ name = "Bob Johnson"; share = 40; amount = 12000; role = "Husband" }];
      portfolioValue = 30000;
      totalBikes = 1;
      totalPayout = 18000;
    };

    demoInvestors.add("johnDoe", demo1);
    demoInvestors.add("janeSmith", demo2);
    demoInvestors.add("aliceJohnson", demo3);

    initializedDemos.add(caller, true);
  };

  public query ({ caller }) func getDemoInvestors() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view demo investors");
    };
    let keys = demoInvestors.keys();
    keys.toArray();
  };

  public shared ({ caller }) func loginAsDemo(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log in as demo");
    };

    let demoProfile = demoInvestors.get(name);
    switch (demoProfile) {
      case (null) {
        Runtime.trap("Demo profile not found");
      };
      case (?profile) {
        investors.add(caller, profile);
      };
    };
  };
};
