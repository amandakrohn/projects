import java.util.*;
import java.io.*;


public class DayOne{
    public DayOne() throws IOException{
        System.out.println(findSum(getInput()));
    }

    public ArrayList<Integer> getInput() throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = "";
        ArrayList<Integer> inputLst = new ArrayList<>();

        while(( line = br.readLine()) != null){
            inputLst.add(Integer.parseInt(line));
        }
        return inputLst;
    }

    public int findSum(ArrayList<Integer> lst){
        int sum = 0;
        int mult = 0;
        int frst = 0;
        int scnd = 0;
        int thrd = 0;
        outer: for(int i = 0; i < lst.size(); i++){
            for(int j = 0; j < lst.size(); j++){
                for(int k = 0; k < lst.size(); k++){
                    frst = lst.get(i);
                    scnd = lst.get(j);
                    thrd = lst.get(k);
                    sum = frst + scnd + thrd;
                    if(sum == 2020){
                        mult = frst * scnd * thrd;
                        break outer;
                     }
                }
            }
        }
        return mult;
    }

    public static void main(String[] args) throws IOException{
        try{
            new DayOne();
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}