import java.util.*;
import java.util.regex.Pattern;

public abstract class Impersonator {
	protected double[][] matrix; 
	/*This is a matrix that will be S x S size, where S is equal to the number of unique words.
	The values of 'matrix' are such that matrix[i][j] will be the chance of dictionary item at index i being followed by dictionary item at index j.*/
	
	protected ArrayList<String> words;  
	/*
	 * This is an array of items to be put into a dictionary.
	 */
	
	protected ArrayList<String> dict;
	/*
	 * The collection of all unique words, where every item from 'words' can be found in dictionary once and only once.
	 */
	
	protected String text;
	/*
	 * The string that contains the user's original input, without any parsing.
	 */
	
	public Impersonator()
	{
		words = new ArrayList<String>();
		dict = new ArrayList<String>();
		text = "";
	}
	
	public Impersonator(String in)
	{
		text = in;
		parseText();
		arrangeDict();
		
		matrix = getMatrix();
	}
	
	public void arrangeDict()
	{
		dict = new ArrayList<String>();
		
		for (String s: words)
		{
			if (!dict.contains(s))
				dict.add(s);
		}
		
		int size = dict.size();
		
		int[] wordCount = new int[size];
		
		Arrays.fill(wordCount, 0);
		for (int i = 0; i<words.size(); i++)
		{
			int index = dict.indexOf(words.get(i));
			wordCount[index]++;
			
		}
		
	}
	
	public ArrayList<String> parseText()
	{
		String[] textList = text.split("\\W");
		
		for (String s : textList)
		{
			words.add(s);
		}
		
		String pattern = ".*\\W.*";
		ArrayList<Integer> matched = new ArrayList<Integer>();
		for (int i = 0; i<words.size(); i++)
		{
			String w = words.get(i);
			if (w.matches(pattern))
			{
				matched.add(i);
				w = w.replaceAll("[-\\W]", "");
				words.set(i, w);
				if (w.matches("\\s"))
				{
					words.remove(i);
					i--;
				}
			}
		}
		
		
		return words;
	}
	
	public double[][] getMatrix()
	{
		
		int size = dict.size();
		
		int[] wordCount = new int[size];
		
		Arrays.fill(wordCount, 0);
		for (int i = 0; i<words.size(); i++)
		{
			int index = dict.indexOf(words.get(i));
			wordCount[index]++;
			
		}
		
		double[][] matx = new double[size][size];
		
		
		for (int i = 0; i<size; i++)//From word at index i
		{
			String word1 = dict.get(i); //first word
			for (int j = 1; j<words.size(); j++) //checks to see if what it's followed by
			{
				String word2 = words.get(j); //word that it might be followed by
				//Or word to be compared to
				
				int index = dict.indexOf(word2);
				
				if (words.get(j-1).equals(word1))//if the word behind word2 this matches word1 
					matx[i][index]++;
			}
		}
		
		for (int i = 0; i<size; i++)
		{
			int count = wordCount[i]; //how many times the word at dict.get(i), 
			//otherwise known as the first part of the bigram,
			//appears in the real text
			for (int j = 0; j<size; j++)
			{
				matx[i][j]/=count;
			}
		}
		
		return matx;
	}
	
	public String stringGen(int strLength)
	{
		String output = new String();
		
		Random rand = new Random();
		int size = dict.size();
		String newStr = ""; //word to be added to the last current word
		String word1 = words.get(rand.nextInt(words.size()));

		for (int i = 0; i<strLength; i++) //runs once for every word that you want.
		{
			double r = rand.nextDouble();
			boolean randFound = false;
			int index = dict.indexOf(word1);
			double[] probabilities = matrix[index];
			double checkChance = probabilities[0];
			for (int j = 0;j<size&& !randFound; j++)
			{
				if (r <= checkChance) //the random number is within the range of the transition chance
				{
					newStr = dict.get(j); //Set the found word to be added
					randFound = true;
				} else
					try
					{
						checkChance+= probabilities[j+1];
					} catch (ArrayIndexOutOfBoundsException e)
					{
						output+= ". \n[End of natural phrase. Generating another one...]\n";
						newStr = dict.get(rand.nextInt(size));
					}
			}
			output+= newStr + " ";
			word1 = newStr;
		}
		
		return output;
	}
}
