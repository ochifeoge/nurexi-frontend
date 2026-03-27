"use server";

import { createClient } from "@/lib/supabase/server";
import { calculateNewStreak } from "../utils";

interface ExamResult {
  correctCount: number;
  totalQuestions: number;
  performanceBySubject: Record<
    string,
    { correct: number; total: number; percentage: number }
  >;
}

export async function saveExamResult(result: ExamResult) {
  try {
    const supabase = await createClient();
    const today = new Date();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Get current stats from database
    const { data: stats, error: fetchError } = await supabase
      .from("learner_stats")
      .select(
        "current_streak, longest_streak, last_activity_date, total_exam_attempts, total_questions_answered, total_correct_answers",
      )
      .eq("user_id", user.id)
      .single();

    if (fetchError) {
      throw new Error("Failed to fetch user stats");
    }

    // Step 3: Calculate new streak
    const newStreak = calculateNewStreak(
      stats.current_streak,
      stats.last_activity_date,
      today,
    );

    const newTotalAttempts = stats.total_exam_attempts + 1;
    const newTotalQuestions =
      stats.total_questions_answered + result.totalQuestions;
    const newTotalCorrect = stats.total_correct_answers + result.correctCount;

    // Update database
    const { error: updateError } = await supabase
      .from("learner_stats")
      .update({
        total_exam_attempts: newTotalAttempts,
        total_questions_answered: newTotalQuestions,
        total_correct_answers: newTotalCorrect,
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, stats.longest_streak),
        last_activity_date: today.toISOString(),
        updated_at: today.toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error("Failed to update stats");
    }

    return {
      success: true,
      newStreak: newStreak,
      streakIncreased: newStreak > stats.current_streak,
    };
  } catch (error) {
    console.error("Error saving exam result:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to save exam results",
    };
  }
}
