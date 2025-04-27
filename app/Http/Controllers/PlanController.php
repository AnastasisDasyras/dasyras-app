<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::all();
        return Inertia::render('Plans/PlanList', [
            'plans' => $plans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Plans/PlanCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:500',
                'author' => 'required|string|max:255',
                'city_id' => 'nullable|string|max:100',
                'duration' => 'nullable|string|max:100',
                'price' => 'nullable|string|max:100',
            ]);

            $plan = Plan::create($validatedData);

            return response()->json([
                'message' => 'Plan created successfully',
                'plan' => $plan
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $plan = Plan::findOrFail($id);
        return view('plans.show', ['plan' => $plan]);
    }

    /**
     * Show the edit form for a specific plan.
     */
    public function edit($id)
    {
        $plan = Plan::findOrFail($id);
        return inertia('Plans/PlanEdit', ['plan' => $plan]);
    }

    /**
     * Handle the update request for a plan.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:500',
                'author' => 'required|string|max:255',
                'city_id' => 'nullable|string|max:100',
                'duration' => 'nullable|string|max:100',
                'price' => 'nullable|string|max:100',
            ]);

            $plan = Plan::findOrFail($id);
            $plan->update($validatedData);

            return response()->json(['message' => 'Plan updated successfully']);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->ajax()) {
            return response()->json(['error' => 'Invalid request'], 400);
        }

        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }

        $plan->delete();

        return response()->json(['message' => 'Plan deleted successfully']);
    }
}
