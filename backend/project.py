import csv
import sys
import json
import ast
import pulp
file = open("fastfood.csv", 'r')
data = csv.reader(file)
food_data = {
    "protein_sources": {
        # "food_item_1": {"calories": 500, "proteins": 20},
        # "food_item_2": {"calories": 600, "proteins": 25},
        # Add more protein sources and their attributes as needed
    },
    "vegetables": {
        # "food_item_3": {"calories": 500, "proteins": 10},
        # "food_item_4": {"calories": 400, "proteins": 3},
        # Add more vegetables and their attributes as needed
    }
}

brand_names = ['Any', 'Mcdonalds', 'Chick Fil-A', 'Sonic',
               'Arbys', 'Burger King', 'Dairy Queen', 'Subway', 'Taco Bell']
inputs = sys.argv[1]
y = inputs.split('*')
bn = []
for i in y[1]:
    bn.append(brand_names[int(i)])
count = 0
# for i in data:
#     if count:
#         if i[0] in bn:
#             if float(i[2]) >= 450 and i[12] != 'NA':
#                 food_data["protein_sources"][i[1]] = {
#                     "calories": int(i[2]), "proteins": float(i[12])}
#             if float(i[2]) <= 450 and i[12] != 'NA':
#                 food_data["vegetables"][i[1]] = {
#                     "calories": int(i[2]), "proteins": float(i[12])}

#     count = count+1
for i in data:
    if count:
        if int(y[1]) != 0:
            if i[0] in bn:
                if float(i[2]) >= 250 and i[12] != 'NA':
                    food_data["protein_sources"][i[1]] = {
                        "calories": int(i[2]), "proteins": float(i[12])}
                if float(i[2]) <= 250 and i[12] != 'NA':
                    food_data["vegetables"][i[1]] = {
                        "calories": int(i[2]), "proteins": float(i[12])}
        else:
            if float(i[2]) >= 250 and i[12] != 'NA':
                food_data["protein_sources"][i[1]] = {
                    "calories": int(i[2]), "proteins": float(i[12])}
            if float(i[2]) <= 250 and i[12] != 'NA':
                food_data["vegetables"][i[1]] = {
                    "calories": int(i[2]), "proteins": float(i[12])}
    count = count+1
calorie_limit = int(y[0])
pulp.LpSolverDefault.msg = 0


# Create a LP Maximization problem

prob = pulp.LpProblem("Maximize_Protein_Intake", pulp.LpMaximize)

# Variables: amount of each food item to be consumed (in grams) and penalty variables
food_vars = {category: {food: pulp.LpVariable(f"{category}_{food}", lowBound=0, cat=pulp.LpInteger)
                        for food in food_data[category]}
             for category in food_data}

penalty_vars = {category: {food: pulp.LpVariable(f"penalty_{category}_{food}", cat=pulp.LpBinary)
                           for food in food_data[category]}
                for category in food_data}

# Objective function: maximize total protein intake with penalty for large quantities of individual items
penalty_factor = 1000  # You can adjust the penalty factor as needed

# Modify the objective function to include penalty terms
for category in food_data:
    for food in food_data[category]:
        prob += food_vars[category][food] - penalty_vars[category][food] * \
            penalty_factor <= 10  # Apply penalty for large quantities
        prob += food_vars[category][food] >= 0

prob += pulp.lpSum((food_data[category][food]["proteins"] * food_vars[category][food])
                   for category in food_data for food in food_data[category])

# Constraint: total calories should not exceed the calorie limit
prob += pulp.lpSum(food_data[category][food]["calories"] * food_vars[category][food]
                   for category in food_data for food in food_data[category]) <= calorie_limit

# Constraint: select at least one food item from each category
for category in food_data:
    prob += pulp.lpSum(food_vars[category][food]
                       for food in food_data[category]) >= 1

# Solve the problem
prob.solve()

file2 = open("fastfood.csv", 'r')
data2 = csv.reader(file2)

# Output the results
# print("Status:", pulp.LpStatus[prob.status])
# print("Optimal Diet:")
optimal_diet = []
for category in food_data:
    for food in food_data[category]:
        if food_vars[category][food].value() > 0:
            # print(f"{food}: {food_vars[category][food].value()} qty")
            optimal_diet.append(
                (category, food, food_vars[category][food].value()))


# print(optimal_diet)
str2 = []
for i in data2:
    for j in optimal_diet:
        if j[1] == i[1]:
            print(end="&")
            for m in i:
                print(m, end="+")
            print(str(j[2]), end="+")

print(end="&")
print("Total Protein Intake:", pulp.value(prob.objective), end="")

sys.stdout.flush()
