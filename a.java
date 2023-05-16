import java.util.Scanner;

class a{
  public static void main(String args[]){
    Scanner inp = new Scanner(System.in);
    int n = inp.nextInt();
    Hotel ht[] = new Hotel[n];
    for(int i = 0; i < n; i++){
      int id = inp.nextInt();
      int min_duration = inp.nextInt();
      int min_duration_cost = inp.nextInt();
      int inc_duration = inp.nextInt();
      int inc_duration_cost = inp.nextInt();
      ht[i] = new Hotel(id, min_duration, min_duration_cost, inc_duration, inc_duration_cost);
    }
    // System.out.println("Dklfjsdjflj");
    int required_hrs = inp.nextInt();
    int budget = inp.nextInt();
    int commission_percent = inp.nextInt();
    int premium_discount = inp.nextInt();
    inp.nextLine();
    char ispremium = inp.nextLine().charAt(0);
    int tax_percent = inp.nextInt();

    for(Hotel i : ht){
      int amount = 0;
      int required_hrs_1 = required_hrs;
      // System.out.println(i.id+ " " +i.inc_duration+ " " +i.inc_duration_cost+ " " +i.min_duration);
      
      required_hrs_1 -= i.min_duration;
      // System.out.println(required_hrs_1);
      amount += i.min_duration_cost;
      // System.out.println(amount);

      if(required_hrs_1 > 0){
        amount += Math.ceil(required_hrs_1/(double)i.inc_duration) * i.inc_duration_cost;
      }
      // System.out.println(amount);

      amount = amount*(100+commission_percent)/100;
      // System.out.println(amount);

      if(ispremium =='y')
        amount = amount*(100-premium_discount)/100;

      amount = amount*(100+tax_percent)/100;
      // System.out.println(amount);

      if(amount <= budget){
        System.out.println(i.id + "|" +amount);
      }
    }
  }
}

class Hotel{
  int id,min_duration,min_duration_cost,inc_duration,inc_duration_cost;
  Hotel(int id, int min_duration, int min_duration_cost, int inc_duration, int inc_duration_cost){
    this.id = id;
    this.min_duration = min_duration;
    this.min_duration_cost = min_duration_cost;
    this.inc_duration = inc_duration;
    this.inc_duration_cost = inc_duration_cost;
  }

}