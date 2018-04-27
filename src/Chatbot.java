import java.util.*;
public class Chatbot extends Impersonator
{	
	String name;
	
	public Chatbot(String text)
	{
		super(text);
		name = "Polly the Parrot";
	}
	
	public void addChat(String chat)
	{
		text+=" "+ chat;
	}
	
	public static void main(String[] args)
	{
		Scanner read = new Scanner(System.in);
		String init = read.nextLine();
		Chatbot chat = new Chatbot(init);
		System.out.println("Hello! I'm " + chat.name + "! Lets chat: ");
		
		
		int i = 0;
		do 
		{
			System.out.println(chat.name + ": \n" +chat.stringGen(20)+"\n\n");
			chat.addChat(read.nextLine());
			
			i++;
		} while(i<6);
	}
	
}
