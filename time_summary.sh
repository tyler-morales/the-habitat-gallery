#!/bin/bash

LOG_FILE="hours.md" # Change this if needed

# Function to extract and sum times
sum_hours() {
    grep -Eo '[0-9]+\.[0-9]+h|[0-9]+h' | sed 's/h//g' | awk '{sum+=$1} END {print sum}'
}

# Total project time
total_time=$(cat "$LOG_FILE" | sum_hours)

# Branch-wise totals
echo "⏳ **Time Summary**"
echo "------------------------"
echo "📌 **Total Time Spent:** $total_time hours"
echo ""

echo "🛠 **Time per Branch**"
awk '/^## Branch:/ {branch=$0} /^[0-9]+\/[0-9]+\/[0-9]+/ {sum[branch]+=$NF} END {for (b in sum) print b, "->", sum[b], "hours"}' "$LOG_FILE"

echo ""

# Day-wise totals
echo "📆 **Time per Day**"
awk '/^[0-9]+\/[0-9]+\/[0-9]+/ {print $1, "-", $NF, "hours"}' "$LOG_FILE"
echo ""

# Week-wise totals
echo "📅 **Time per Week**"
awk -F'/' '/^[0-9]+\/[0-9]+\/[0-9]+/ {week=int($2/7); sum[week]+=$NF} END {for (w in sum) print "Week", w+1, "->", sum[w], "hours"}' "$LOG_FILE"
echo ""

# Month-wise totals
echo "🗓 **Time per Month**"
awk -F'/' '/^[0-9]+\/[0-9]+\/[0-9]+/ {sum[$2]+=$NF} END {for (m in sum) print "Month", m, "->", sum[m], "hours"}' "$LOG_FILE"
echo ""