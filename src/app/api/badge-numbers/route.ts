import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BadgeNumber, defaultBadgeNumbers, COLLECTION_NAME } from '@/lib/models/BadgeNumber';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection<BadgeNumber>(COLLECTION_NAME);
    
    // Check if collection is empty and initialize with default values
    const count = await collection.countDocuments();
    if (count === 0) {
      const defaultData = defaultBadgeNumbers.map(item => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await collection.insertMany(defaultData);
    }
    
    const badgeNumbers = await collection.find({}).toArray();
    
    return NextResponse.json({ success: true, data: badgeNumbers });
  } catch (error) {
    console.error('Error fetching badge numbers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch badge numbers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, eventTitle, badgeNumber, totalSlots } = body;
    
    if (!eventId || !eventTitle || badgeNumber === undefined || !totalSlots) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection<BadgeNumber>(COLLECTION_NAME);
    
    const newBadgeNumber: Omit<BadgeNumber, '_id'> = {
      eventId,
      eventTitle,
      badgeNumber: parseInt(badgeNumber),
      totalSlots: parseInt(totalSlots),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newBadgeNumber);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newBadgeNumber } 
    });
  } catch (error) {
    console.error('Error creating badge number:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create badge number' },
      { status: 500 }
    );
  }
}