import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BadgeNumber, COLLECTION_NAME } from '@/lib/models/BadgeNumber';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const body = await request.json();
    const { badgeNumber, eventTitle, totalSlots } = body;
    
    // Check if at least one field is provided for update
    if (badgeNumber === undefined && totalSlots === undefined && !eventTitle) {
      return NextResponse.json(
        { success: false, error: 'At least one field (badgeNumber, totalSlots, or eventTitle) is required for update' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection<BadgeNumber>(COLLECTION_NAME);
    
    const updateData: Partial<BadgeNumber> = {
      updatedAt: new Date(),
    };
    
    if (badgeNumber !== undefined) updateData.badgeNumber = parseInt(badgeNumber);
    if (eventTitle) updateData.eventTitle = eventTitle;
    if (totalSlots !== undefined) updateData.totalSlots = parseInt(totalSlots);
    
    const result = await collection.updateOne(
      { eventId },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    const updatedDocument = await collection.findOne({ eventId });
    
    return NextResponse.json({ 
      success: true, 
      data: updatedDocument 
    });
  } catch (error) {
    console.error('Error updating badge number:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update badge number' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    
    const { db } = await connectToDatabase();
    const collection = db.collection<BadgeNumber>(COLLECTION_NAME);
    
    const result = await collection.deleteOne({ eventId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Badge number deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting badge number:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete badge number' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    
    const { db } = await connectToDatabase();
    const collection = db.collection<BadgeNumber>(COLLECTION_NAME);
    
    const badgeNumber = await collection.findOne({ eventId });
    
    if (!badgeNumber) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: badgeNumber 
    });
  } catch (error) {
    console.error('Error fetching badge number:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch badge number' },
      { status: 500 }
    );
  }
}